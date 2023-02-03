import axios from "axios";
import type {IPackage} from "@/interfaces/packge";

interface ISearchPackage {
  text: string,
  size?: number;
  offset?: number;
}

export const api = {
  searchPackage: async ({text, size = 10, offset = 0}: ISearchPackage) => {
    return axios.get<IPackage>(`https://registry.npmjs.org/-/v1/search?text=${text}&size=${size}&from=${offset}`);
  },
  moreInformationAboutPackage: async ({name}: { name: string }) => {
    return axios.get(`https://data.jsdelivr.com/v1/package/npm/${name}`);
  }
};