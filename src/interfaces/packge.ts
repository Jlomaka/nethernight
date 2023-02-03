export interface IPackageLinks {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

export interface IPackageAuthor {
  name: string;
  email: string;
  username: string;
}

export interface IPackagePublisher {
  username: string;
  email: string;
}

export interface IPackageMaintainer {
  username: string;
  email: string;
}

export interface IPackagePackage {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: Date;
  links: IPackageLinks;
  author: IPackageAuthor;
  publisher: IPackagePublisher;
  maintainers: IPackageMaintainer[];
}

export interface IPackageFlags {
  unstable: boolean;
}

export interface IPackageDetail {
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface IPackageScore {
  final: number;
  detail: IPackageDetail;
}

export interface IPackageRootObject {
  package: IPackagePackage;
  flags: IPackageFlags;
  score: IPackageScore;
  searchScore: number;
}

export interface IPackage {
  objects: IPackageRootObject[];
  time: Date;
  total: number;
}

export interface IExtraInformation {
  tags: Record<string, string>,
  versions: string[]
}