export type Project = {
  slug: string;
  title: string;
  info: ProjectInfo;
  image: string;
};

export type ProjectInfo = {
  campo: string;
  cliente: string;
  tecnologia: string[];
};