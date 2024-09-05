const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export const getProfileInfo = async (): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/profile`, { method: 'GET' });
        if (!response.ok) {
            return new Error(`Failed to fetch profile info: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching profile info:', error);
        return error;
    }
};

export const updateProfileInfo = async (newProfileInfo: any): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfileInfo),
        });

        if (!response.ok) {
            return new Error(`Failed to update profile info: ${response.statusText}`);
        }
    } catch (error: any) {
        console.error('Error updating profile info:', error);
        return error;
    }

    return null as unknown as Error;
};
