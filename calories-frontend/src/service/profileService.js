import axios from './axios';

export async function createProfile(profileData){
    const response = await axios.post('/api/profiles', {
        data : profileData,
    });
    return response;
}