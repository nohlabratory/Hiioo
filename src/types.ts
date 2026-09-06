export type CourseCategory =
  | 'All'
  | 'Web & Software'
  | 'AI & Data Science'
  | 'Design & Creative'
  | 'Business & Marketing'
  | 'Mobile & Cloud';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  instructor: string;
  description: string;
  lessons: Lesson[];
  skills: string[];
}

export type PaymentProvider = 'telebirr' | 'cbe' | 'awash' | 'chapa';

export interface OrderDetails {
  bundleName: string;
  priceETB: number;
  totalCourses: number;
  phoneNumber?: string;
  transactionReference?: string;
  provider: PaymentProvider;
  purchasedAt?: string;
}
