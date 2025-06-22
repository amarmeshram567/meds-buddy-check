import axios from "axios"
import { error } from "console"
import { toast } from "sonner"

const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

function getToken() {
    return localStorage.getItem('token')
}

export async function createMedication({name, dosage, frequency}) {
    try {
        const response = await axios.post(
            `${backend_url}/api/medication/add-medicine`,
            {name, dosage, frequency},
            {headers: {
                'Authorization': `Bearer ${getToken()}`
            }} 
        );

        if (response.data.success === false) {
            toast.error(response.data.error);
            return null; 
        }

        return response.data

    } catch (error) {
        toast.error(error.message)
        return null;
    }
}


export async function getMedication() {
   try {
        const response = await axios.post(`${backend_url}/api/medication/get-medicine`, 
            {headers: 
                {Authorization: `Bearer ${getToken()}`}
            }
        )

        if(response.data.success === false) {
            toast.error(response.data.message || "Failed to get medication")
            return [];
        }

        return response.data;
   } catch (error) {
        toast.error(error.message)
        return []
   }
}

export async function markMedicine({id}) {
   try {
        const response = await axios.post(`${backend_url}/api/medication/${id}`, {}, 
            {headers: 
                {Authorization: `Bearer ${getToken()}`}
            }
        )

        if(response.data.success === false) {
            toast.error(response.data.message || "Failed to mark medication")
            return [];
        }

        return response.data;
   } catch (error) {
        toast.error(error.message)
        return []
   }
}

export async function getAdherence() {
   try {
        const response = await axios.post(`${backend_url}/api/medication/adherence`, 
            {headers: 
                {Authorization: `Bearer ${getToken()}`}
            }
        )

        if(response.data.success === false) {
            toast.error(response.data.message || "Failed to get adherence")
            return [];
        }

        return response.data;
   } catch (error) {
        toast.error(error.message)
        return []
   }
}

export async function uploadPhoto({id, file}) {
    try {

        const formData = new FormData();
        formData.append('photo', file);

        const response = await axios.post(`${backend_url}/api/medication/upload-photo/${id}`, 
            formData,
            {headers: 
                {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type' : 'multipart/form-data'
                }
            }
        );

        if(response.data.success === false) {
            toast.error(response.data.message || "Upload failed")
            return null;
        }

        return response.data;
    } catch (error) {
        toast.error(error.message)
        return null;
    }
}