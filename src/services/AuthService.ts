export class AuthService {
    public async login(email: string, password: string): Promise<{user:string}> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            if (email === "demo@example.com" && password === "demo123") {
                resolve({
                    user:"Demo User"
                });
            } else {
                reject(new Error("Invalid credentials"));  // ✅ proper error
            }
            }, 1000);
        });
     
    };

    public async logout(): Promise<void> {
        // Simulate an API call to log out the user
        return Promise.resolve();
    }

    public async getUserInfo(): Promise<{
        email: string;
        id: string;
        name: string;
    }> {
        return Promise.resolve({
            email: "",
            id: "1",
            name: "Demo User"
        });
    }
}



//   const handleLogin = async (email: string, password: string): Promise<boolean> => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Demo credentials
//     if (email === 'demo@example.com' && password === 'demo123') {
//       setIsLoggedIn(true);
//       
//       return true;
//     }
    
//     return false;
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//    
//   };