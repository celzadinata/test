type CategoryType = {
  id: string;
  category_name: string;
};

type ResponseType = {
  status: number;
  message: string;
  data: CategoryType[];
};

export const CategoryResponse: ResponseType = {
  status: 200,
  message: "Ok",
  data: [
    {
      id: "d6ec5384-fe90-4fb3-b53a-4fa4ae42485d",
      category_name: "Nasional",
    },
    {
      id: "72daf1b6-75e1-4764-9dff-8c592ef701b5",
      category_name: "Internasional",
    },
    {
      id: "4ce627a0-1b0d-4ed9-a6ad-529610f46003",
      category_name: "Mega Politik",
    },
    {
      id: "f95a8d92-e781-423b-ae66-6faa8eec39c2",
      category_name: "Lokal",
    },
  ],
};
