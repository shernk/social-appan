const useProfilesHandles = (signOutUserAction, uploadImageAction) => {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImageAction(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleSignout = () => {
    signOutUserAction();
  };

  return { handleEditPicture, handleImageChange, handleSignout };
};

export default useProfilesHandles;
