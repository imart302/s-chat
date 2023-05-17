import { IAuthUser } from "@/interfaces";
import { chatApi } from "./chatApi";


export const updateImageProfile = async (file: File) => {

  const formData = new FormData();
  formData.append('img', file);

  const resp = await chatApi.put('/profile/img', formData, {
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });

  const user = resp.data.user as IAuthUser;
  return user;
  
}


