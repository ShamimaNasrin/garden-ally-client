/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { useState } from "react";
import UploadImgToImgBB from "./UploadImgToImgBB";
import "react-quill/dist/quill.snow.css";

export const categoryList = [
  "Vegetables",
  "Flowers",
  "Landscaping",
  "Indoor Plants",
];

type AddPostModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  // description: string;
  imageUrl: string;
  category: string;
  isPremium: boolean;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddPostModal = ({ closeModal }: AddPostModalProps) => {
  const [editorHtml, setEditorHtml] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    if (data.imageUrl && data.imageUrl.length) {
      try {
        const file = data.imageUrl[0] as any;
        const imgBBUrl = await UploadImgToImgBB(file);
        data.imageUrl = imgBBUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
        return;
      }
    } else {
      data.imageUrl = "";
    }

    const postData = {
      title: data.title,
      description: editorHtml,
      imageUrl: data.imageUrl,
      category: data.category,
      isPremium: data.isPremium,
      authorId: "authorId",
    };

    console.log("postdata:", postData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Post</h2>
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
          {/* <textarea
            className="w-full p-2 mb-4 border rounded"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )} */}

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
            {...register("imageUrl", { required: "Image is required" })}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            className="w-full p-2 mb-4 border rounded"
            {...register("category", { required: "Category is required" })}
          >
            <option value="" className="text-black">
              Select Category
            </option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat} className="text-gray-800">
                {cat}
              </option>
            ))}
          </select>

          <label className="flex items-center space-x-2 mb-4">
            <input type="checkbox" {...register("isPremium")} />
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

export default AddPostModal;
