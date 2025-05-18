type FileType = {
  id: string;
  file_name: string;
  size: number;
  file_type: string;
  url: string;
  description: string;
};

type HashtagType = {
  id: string;
  hashtag_name: string;
};

type DataType = {
  id: string;
  slug: string;
  title: string;
  body: string;
  category_name: string;
  file_news: FileType[];
  hashtags: HashtagType[];
};

type ResponseType = {
  status: number;
  message: string;
  data: DataType[];
};

const ResponseData: ResponseType[] = [
  {
    status: 200,
    message: "Ok",
    data: [
      {
        id: "123e4567-e89b-12d3-a456-426655440000",
        slug: "korupsi-timah-271-triliun",
        title:
          "Kerugian Korupsi Timah Rp 271 Triliun. Bagaimana Menghitungnya?",
        body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        category_name: "Nasional",
        file_news: [
          {
            id: "4749c2de-2448-485d-ae11-d20581fa9791",
            file_name: "Thumbnail Photo",
            size: 5,
            file_type: "jpg",
            url: "https://asset.kompas.com/crops/ZaUnmiMpApZkIFIybIaqyrj2RI4=/423x0:4705x2854/1200x800/data/photo/2024/12/24/676a16d6ebf65.jpg",
            description: "HEADLINE",
          },
          {
            id: "f1e32226-309c-46ad-8725-16d5fc9c6852",
            file_name: "News Video",
            size: 10,
            file_type: "mp4",
            url: "https://www.youtube.com/embed/iV4B_oAQVSg?si=CASo99XlPzOE59SP",
            description: "VIDEO",
          },
        ],
        hashtags: [
          {
            id: "626ebb1e-5d41-49c6-a16f-5b4399487a6b",
            hashtag_name: "Korupsi",
          },
          {
            id: "1bebf4ab-377f-451a-bcb9-33153f5d12d2",
            hashtag_name: "271Triliun",
          },
          {
            id: "27fd4e9a-a55a-42c1-a9be-e57f6916fe5f",
            hashtag_name: "KorupsiTimah",
          },
        ],
      },
    ],
  },
  {
    status: 200,
    message: "Ok",
    data: [
      {
        id: "987fcdeb-456a-78b9-c123-789012340000",
        slug: "banjir-jakarta-2025",
        title: "Banjir Besar Melanda Jakarta, Apa Penyebabnya?",
        body:
          "Dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. " +
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        category_name: "Metro",
        file_news: [
          {
            id: "a1b2c3d4-5678-90ef-gh12-345678901234",
            file_name: "Flood Jakarta Image",
            size: 7,
            file_type: "jpg",
            url: "https://asset.kompas.com/crops/pTeGi0FnMQN-W758mQw9ym4DrZA=/0x0:0x0/1200x800/data/photo/2025/03/04/67c6c77083ce2.jpg",
            description: "HEADLINE",
          },
          {
            id: "e5f6g7h8-9012-34ij-kl56-789012345678",
            file_name: "Flood Report Video",
            size: 15,
            file_type: "mp4",
            url: "https://www.youtube.com/embed/YoOwm8fFpL8?si=HIvA0F-PLCdXVTDQ",
            description: "VIDEO",
          },
        ],
        hashtags: [
          {
            id: "9a8b7c6d-5432-10fe-gh98-765432109876",
            hashtag_name: "BanjirJakarta",
          },
          {
            id: "1f2e3d4c-5678-90ab-cd12-345678901234",
            hashtag_name: "Banjir2025",
          },
          {
            id: "5b6a7f8e-9012-34cd-ef56-789012345678",
            hashtag_name: "JakartaBanjir",
          },
        ],
      },
    ],
  },
];

export const getAllNews = async (): Promise<DataType[]> => {
  const allNews: DataType[] = ResponseData.flatMap((response) => response.data);
  return allNews;
};

export const getNewsDetail = async (
  id: string,
  slug: string
): Promise<DataType | null> => {
  for (const response of ResponseData) {
    const found = response.data.find((item) => item.id === id);
    if (found) {
      if (found.slug === slug) {
        return found;
      } else {
        return null;
      }
    }
  }
  return null;
};

export const getRandomNews = async (): Promise<DataType | null> => {
  // Mengumpulkan semua berita dari ResponseData
  const allNews: DataType[] = ResponseData.flatMap((response) => response.data);

  // Jika tidak ada berita, kembalikan null
  if (allNews.length === 0) {
    return null;
  }

  // Memilih indeks acak
  const randomIndex = Math.floor(Math.random() * allNews.length);

  // Mengembalikan berita pada indeks acak
  return allNews[randomIndex];
};
