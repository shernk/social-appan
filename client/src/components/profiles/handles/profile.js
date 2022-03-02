const useProfilesHandles = (signOutUserAction, uploadImageAction) => {
  const handleImageChange = (event) => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    
    const image = event.target.files[0];
    console.log("image: ",image)
    console.log(event.target.files[0].name)
    const formData = new FormData();
    const data = formData.append("image", image, image.name);
    console.log("formData: ", data)
    uploadImageAction(data);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    console.log("file input:", fileInput);
    fileInput.click();
  };

  const handleSignout = () => {
    signOutUserAction();
  };

  return { handleEditPicture, handleImageChange, handleSignout };
};

export default useProfilesHandles;
