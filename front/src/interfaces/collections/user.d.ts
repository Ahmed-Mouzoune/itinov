type TStrapiUserApiResponse = {
    jwt: string
    user: IUser
}

interface IUser  {
    id: number;
    username: string;
    email: string;
    provider: "local";
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    user: User | undefined;
    token: string | undefined;
    saveUserData: (userData: User, authToken: string) => void;
    deleteUserData: () => void;
    checkAuth: () => void;
}