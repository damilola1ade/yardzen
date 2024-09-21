/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useUserStore } from "@/store/store";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { toast } from "sonner";
import { Cancel } from "@mui/icons-material";
import { useMutation } from "react-query";
import { uploadAvatar } from "@/api/api";

export default function Home() {
  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const { isSubmitting, setIsSubmitting, user, setUser } = useUserStore();

  const mutation = useMutation(uploadAvatar, {
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data: any) => {
      console.log(data);
      setUser({ ...user, avatar: data.filePath });
      setFile(null);
      setPreviewUrl(null);
      toast.success("Avatar uploaded");
    },
    onError: (error: any) => {
      console.error("Error submitting form:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const getFileInfo = (e: any) => {
    const selectedFile = e.target.files[0];
    const maxSizeBytes = 3 * 1024 * 1024;

    if (selectedFile && selectedFile.size > maxSizeBytes) {
      toast.error("File size exceeds 3MB. Please select a smaller file.");
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as any);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    mutation.mutate(formData as any);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        {previewUrl && (
          <div className="flex relative">
            <Image
              src={previewUrl}
              width={200}
              height={200}
              alt="avatar"
              className="rounded-md"
            />
            <div
              className="absolute right-0 cursor-pointer"
              onClick={() => {
                setPreviewUrl(null);
                setFile(null);
              }}
            >
              <Cancel />
            </div>
          </div>
        )}

        <h1>Welcome!</h1>
        <h1 className="font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {file ? (
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="p-3 rounded-3xl"
            >
              {isSubmitting ? "..." : "Upload"}
            </Button>
          ) : (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="mt-4"
            >
              Upload avatar
              <VisuallyHiddenInput
                type="file"
                name="avatar"
                accept="image/jpeg, image/png, image/webp"
                onChange={getFileInfo}
              />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
