import { useState } from "react";
import { SignedIn, useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

/**
 * Global context for managing user credit system
 * Handles credit fetching and state management across the app
 */
export const Appcontext = createContext();

const Appcontextprovider = (props) => {
  // ============ Credit System State ============
  const [credits, setCredit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============ Image Upload State ============
  /** @type {[File|null, Function]} Original uploaded image file */
  const [uploadedImage, setUploadedImage] = useState(0);
  
  /** @type {[string|null, Function]} URL of image after background removal */
  const [resultImage, setResultImage] = useState(0);
  
  /** @type {[boolean, Function]} Loading state for background removal process */
  const [processingImage, setProcessingImage] = useState(0);

  // ============ Hooks & Constants ============
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  /**
   * Fetch user credits from backend
   * Uses Clerk authentication token in Authorization header
   * Safely handles null responses and network errors
   */
  const loadCreditsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get Clerk authentication token
      const token = await getToken();
      if (!token) {
        console.warn('⚠️ No Clerk token available - user may not be authenticated');
        return;
      }

      // Fetch credits from backend with Bearer token
      const { data } = await axios.get(
        `${backendUrl}/api/user/credits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000 // 5 second timeout
        }
      );

      // Backend returns { success: true, credit: number }
      if (data.success && data.credit !== undefined) {
        setCredit(data.credit);
        console.log(`✅ Credits loaded: ${data.credit}`);
      } else {
        throw new Error('Invalid response format from backend');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load credits';
      console.error('❌ Error loading credits:', errorMsg);
      setError(errorMsg);
      
      // Only show toast for non-auth errors (auth errors are expected before login)
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };
  /**
   * Upload image for background removal processing
   * 
   * Features:
   * - Shows loading state immediately (prevents multiple submissions)
   * - Uploads image to backend API
   * - Stores uploaded image in context
   * - Navigates to /result page AFTER successful upload
   * - Handles errors gracefully with toast notifications
   * 
   * @param {File} imageFile - Image file to upload
   * @returns {Promise<void>}
   * 
   * Flow:
   * 1. Validate authentication & image
   * 2. Start loading state (blocks further uploads)
   * 3. Send image to backend
   * 4. Store image in context on success
   * 5. Navigate to /result (only after upload completes)
   * 6. Show error toast if upload fails
   */
 const handleImageUpload = async (imageFile) => {
  if (!isSignedIn) return openSignIn();
  if (!imageFile) return toast.error("No image selected");

  setProcessingImage(true);
  setError(null);

  try {
    const token = await getToken();
    if (!token) throw new Error("Please sign in again.");

    const formData = new FormData();
    formData.append('image', imageFile);

    const { data } = await axios.post(
      `${backendUrl}/api/upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      }
    );

    if (!data.success) throw new Error(data.message || "Upload failed");

    setUploadedImage(imageFile);
    setResultImage(URL.createObjectURL(imageFile)); // preview
    navigate('/result');

  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    toast.error(msg);
    setError(msg);
  } finally {
    setProcessingImage(false);
  }
};
  // ============ Context Value ============
  const value = {
    // Credit System
    credits,
    setCredit,
    loading,
    error,
    loadCreditsData,
    
    // Image Upload
    uploadedImage,
    setUploadedImage,
    resultImage,
    setResultImage,
    processingImage,
    setProcessingImage,
    handleImageUpload,
    
    // Config
    backendUrl
  };

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default Appcontextprovider;