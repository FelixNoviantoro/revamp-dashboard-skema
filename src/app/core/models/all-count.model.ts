export interface Location {
  key: string;
  value: number;
  percentage?: number;
}

export interface TopLocation {
  location: Location[];
  total_article: 351;
  total_top_location_article: 213;
}

export interface AllCount {
  top_location: TopLocation;
  data: Location[];
}

export interface ArticleCategory {
  category_id: string;
  count: number;
}

export interface ProvinceData {
  key: string;
  value: number;
  categories: ArticleCategory[];
}

export interface ProvinceCount {
  code: number;
  message: string;
  data: ProvinceData[];
}