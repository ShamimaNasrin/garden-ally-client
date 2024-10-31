/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import UploadImgToImgBB from "./UploadImgToImgBB";
import { categoryList } from "./AddPostModal";
import { TNewsPost } from "@/types";
import { useUpdateAPostMutation } from "@/redux/features/post/postApi";

type EditPostModalProps = {
  post: TNewsPost;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  // description: string;
  images: string;
  category: string;
  isPremium: boolean;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditPostModal = ({ post, closeModal }: EditPostModalProps) => {
  const [editorHtml, setEditorHtml] = useState<string>(post.description || "");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: post.title,
      category: post.category,
      isPremium: post.isPremium,
    },
  });

  const [updateAPost] = useUpdateAPostMutation();

  useEffect(() => {
    setValue("title", post.title);
    setValue("category", post.category);
    setValue("isPremium", post.isPremium);
  }, [post, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("formdata:", data);
    // console.log("description:", editorHtml);

    if (!editorHtml.trim() || editorHtml === "<p><br></p>") {
      toast.error("Description is required", { duration: 1000 });
      return;
    }

    if (data.images && data.images.length) {
      console.log("default img:", data.images);
      try {
        const file = data.images[0] as any;
        const imgBBUrl = await UploadImgToImgBB(file);
        data.images = imgBBUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
        return;
      }
    } else {
      data.images = "";
    }

    const postData = {
      title: data.title || post.title,
      description: editorHtml || post.description,
      images: data.images || post.images,
      category: data.category || post.category,
      isPremium: data.isPremium || post.isPremium,
    };

    // console.log("postdata:", postData);

    try {
      const res = await updateAPost({
        postId: post?._id,
        updatedInfo: postData,
      }).unwrap();
      if (res?.success) {
        console.log("update res:", res?.message);
        toast.success("Post updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Post");
    }

    closeModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>

          <ReactQuill
            value={editorHtml}
            onChange={setEditorHtml}
            className="border text-black rounded-md"
          />

          <label className="block text-gray-700 font-semibold mb-1">
            Image
          </label>
          <input
            type="file"
            className="w-full p-2 mb-4 border rounded"
            accept="image/*"
            placeholder="Image URL"
            {...register("images")}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            defaultValue={post.category}
            className="w-full p-2 mb-4 border rounded"
            {...register("category")}
          >
            <option value="" disabled className="text-black">
              Select Category
            </option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat} className="text-gray-800">
                {cat}
              </option>
            ))}
          </select>

          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              {...register("isPremium")}
              defaultChecked={post.isPremium}
            />

            <span>Premium</span>
          </label>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => closeModal(false)}
              className="px-4 py-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
