import { useStore } from "@/app/store";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { jwtDecode } from "jwt-decode";
import { FormEvent, useState, useEffect } from "react";
import browser from "webextension-polyfill";

const isValidToken = (token: string) => {
  try {
    jwtDecode(token);
    return true;
  } catch (error) {
    return false;
  }
};

const Login = ({ onClose }: { onClose: () => void }) => {
  const { setAccessToken } = useStore();
  const [errors, setErrors] = useState("");
  const [inputAccessToken, setInputAccessToken] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidToken(inputAccessToken)) {
      setErrors("Invalid Token");
      return;
    }
    try {
      await browser.storage.local.set({ accessToken: inputAccessToken });
      setAccessToken(inputAccessToken);
      onClose(); 
    } catch (error) {
      console.error("Error saving token:", error);
      setErrors("Failed to save token");
    }
  };

  return (
    <form className="p-5 text-white rounded-sm flex flex-col gap-2" onSubmit={handleSubmit}>
      <p className="mb-1">
        Click{" "}
        <span className="rounded-sm underline">
          <a
            href="https://anilist.co/api/v2/oauth/authorize?client_id=16601&response_type=token"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </span>{" "}
        to start the authorization process. You will be redirected to authorization. After authorization, AniList will give you a token. Copy and paste that below to complete the linking.
      </p>
      <input
        placeholder="Enter Token"
        type="text"
        className="border text-black border-black border-solid p-2 rounded-sm outline-none focus:border-blue-500"
        value={inputAccessToken}
        onChange={(e) => {
          setInputAccessToken(e.target.value);
          setErrors("");
        }}
      />
      {errors && <span className="text-red-500">{errors}</span>}
      <button type="submit" className="p-2 rounded-sm bg-[#02a9ff] text-white">
        Submit
      </button>
    </form>
  );
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const result = await browser.storage.local.get("accessToken");
        if (result.accessToken) {
          setAccessToken(result.accessToken as string);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    loadToken();
  }, [setAccessToken]);

  if (!accessToken) {
    return (
      <section className="flex w-full h-full">
        <div className="p-5 bg-primary_bg relative w-[90%] h-full flex flex-col items-start justify-center">
          {!isDialogOpen && (
            <>
              <h1 className="text-4xl text-primary_text font-bold">You are not logged in</h1>
              <p className="my-2 text-primary_text">Please login to access the settings</p>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="px-2 py-1 bg-[#02a9ff] text-primary_text text-[1.2rem] font-bold rounded-sm"
              >
                Login
              </button>
            </>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <Login onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-[10%] bg-purple"></div>
      </section>
    );
  }
  return <>{children}</>;
};

export default Auth;