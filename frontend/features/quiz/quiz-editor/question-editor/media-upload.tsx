import { Button } from "@/components/button";
import { Plus } from "lucide-react";

export function MediaUpload() {
	return (
		<div className="rounded-md w-full bg-[#d2cae2] flex flex-col items-center px-8 pt-12 pb-6 text-black-soft cursor-pointer shadow-md">
			<img src="/media-upload-icon.svg" className="w-3xs" />
			<Button className="bg-white rounded-sm p-4 mt-4 shadow-md">
				<Plus />
			</Button>
			<p className="text-3xl font-medium mt-6">Find and insert media</p>
			<p className="text-2xl font-medium mt-18">
				<span className="font-bold underline">Upload file</span> or drag here to
				upload
			</p>
		</div>
	);
}
