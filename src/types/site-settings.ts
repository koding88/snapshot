export interface SiteSettings {
  socialLinks: {
    facebookUrl: string | null;
    pinterestUrl: string | null;
    instagramUrl: string | null;
    whatsappUrl: string | null;
  };
  contactInfo: {
    contactEmail: string | null;
    officeAddress: string | null;
  };
}
