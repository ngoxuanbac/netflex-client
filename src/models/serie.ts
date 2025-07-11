import { Genre } from "./genre";
import { Keyword } from "./keyword";
import { PaginationRequest } from "./pagination";

export interface Serie {
  id: number;
  name: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
  countryIso?: string;
  firstAirDate?: string;
  lastAirDate?: string;
}

export interface SerieDetail extends Serie {
  genres?: Genre[];
  keywords?: Keyword[];
}

export interface CreateSeriePayload {
  name: string;
  overview?: string;
  poster?: File;
  backdrop?: File;
  countryIso?: string;
  firstAirDate?: Date;
  lastAirDate?: Date;
  keywords?: number[];
  genres?: number[];
}

export interface UpdateSeriePayload {
  name?: string;
  overview?: string;
  poster?: File;
  backdrop?: File;
  countryIso?: string;
  firstAirDate?: Date;
  lastAirDate?: Date;
  keywords?: number[];
  genres?: number[];
}

export interface SerieQueryable extends PaginationRequest {
  search?: string;
  genres?: number[];
  keywords?: number[];
  sortBy?: string;
}
