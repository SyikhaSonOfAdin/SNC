export type user = {
  ID: string;
  COMPANY_ID: string;
  PROJECT_ID: string;
  USERNAME: string;
  EMAIL: string;
  PASSWORD: string;
  SINCE: string;
};

export type permission = {
  ID: string;
  NAME: string;
  DESCRIPTION: string;
}

export type drawing = {
    ISO_NO: string;
    VERSION: string;
    FILE_NAME: string;
}