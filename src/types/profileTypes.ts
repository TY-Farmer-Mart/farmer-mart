export interface ProfileCardProps {
  name: string;
  location: string;
  memberSince: string;
  rating: string;
}

export interface ContactInfoProps {
  mobile: string;
  email: string;
  address: string;
  altMobile?: string;
  altEmail?: string;
  onEdit?: () => void;
}

export interface CompanyInfoProps {
  companyName: string;
  industryType?: string;
  gstNumber: string;
  companyAddress: string;
  ownerName?: string;
  onEdit?: () => void;
}
