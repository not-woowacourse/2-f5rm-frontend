import { API_ROUTES } from '@/constants/routes';
import { axiosInstance } from '@/lib/axios';
import { type AxiosPostFormDto, type AxiosPostFormResponseDto } from '@/types/dto';

const axiosPostForm = (axiosPostFormDto: AxiosPostFormDto) => {
  return axiosInstance.post<AxiosPostFormResponseDto>(
    API_ROUTES.FORMS,
    axiosPostFormDto,
  );
};

export { axiosPostForm };
