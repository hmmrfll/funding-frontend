import React, { useEffect, useRef, useState } from 'react';
import Skeleton from './Skeleton';
import AvatarMaskWithIcon from '../assets/AvatarMaskWithIcon.svg';
import AvatarMask from '../assets/AvatarMask.svg';

type AvatarProps = {
	imgPath?: string;
	size?: number;
	icon?: React.ReactNode;
	onFileChange?: (file: File) => void;
	isLoading?: boolean;
	className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
	imgPath = '',
	size = 48,
	icon = null,
	onFileChange = null,
	isLoading,
	className = '',
}) => {
	const [image, setImage] = useState(imgPath);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const iconSize = size * 0.375; // 36px при size = 96
	const offset = size * -0.03125; // -3px при size = 96
	const fontSize = size * 0.2917; // 14px при size = 48

	const handleAvatarClick = () => {
		if (onFileChange && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && onFileChange) {
			const imageURL = URL.createObjectURL(file);
			setImage(imageURL);
			onFileChange(file);
		}
	};

	useEffect(() => {
		setImage(imgPath);
	}, [imgPath]);

	if (isLoading) {
		return (
			<div
				className={`rounded-full ${className}`}
				style={{ width: `${size}px`, height: `${size}px` }}
			>
				<Skeleton className="w-full h-full rounded-full" />
			</div>
		);
	}

	if (!image) {
		return (
			<div
				className={`relative bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center ${
					onFileChange ? 'cursor-pointer' : ''
				} ${className}`}
				onClick={handleAvatarClick}
				style={{ width: `${size}px`, height: `${size}px` }}
			>
				<span
					className="text-[var(--color-text-secondary)] font-semibold"
					style={{ fontSize: `${fontSize}px` }}
				>
					U
				</span>

				{onFileChange && (
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
					/>
				)}
			</div>
		);
	}

	return (
		<div
			className={`relative bg-transparent ${onFileChange ? 'cursor-pointer' : ''} ${className}`}
			onClick={handleAvatarClick}
			style={{ width: `${size}px`, height: `${size}px` }}
		>
			<div
				className="w-full h-full bg-cover bg-center"
				style={{
					backgroundImage: `url(${image})`,
					WebkitMaskImage: `url(${icon ? AvatarMaskWithIcon : AvatarMask})`,
					maskImage: `url(${icon ? AvatarMaskWithIcon : AvatarMask})`,
					WebkitMaskSize: '100% 100%',
					maskSize: '100% 100%',
				}}
			/>

			{icon && (
				<div
					className="absolute bg-transparent"
					style={{
						width: `${iconSize}px`,
						height: `${iconSize}px`,
						bottom: `${offset}px`,
						right: `${offset}px`,
						fontSize: `${fontSize}px`,
					}}
				>
					{icon}
				</div>
			)}

			{onFileChange && (
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileChange}
				/>
			)}
		</div>
	);
};

export default Avatar;
