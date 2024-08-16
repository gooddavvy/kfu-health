// utils/profileApi.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const getProfileInfo = async (): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/profile`);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile info: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile info:', error);
        throw error;
    }
};

export const updateProfileInfo = async (newProfileInfo: any): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfileInfo),
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile info: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating profile info:', error);
        throw error;
    }
};
