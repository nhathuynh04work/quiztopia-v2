export type Session = {
	id: string;
	ipAddress: string | null;
	country: string | null;
	city: string | null;
	deviceType: string | null;
	deviceName: string | null;
	browserName: string | null;
	osName: string | null;
	createdAt: Date;
	userId: string;
};
