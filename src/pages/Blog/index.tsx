import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import blogData from "./blogData.json";
import { instance } from "../../configs/api";
import BlogCard from "../../components/Card";
import { Skeleton } from "@mui/material";

const theme = createTheme();

export default function Blog() {
  const [blogs, setBlogs] = useState<Array<any> | null>([{}]);
  const [loading, setLoading] = useState(true);

  const fetchAllPostData = () => {
    instance
      .get("/posts")
      .then((res) => {
        console.log(res);

        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setBlogs(blogData);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && blogs!.length > 0 ? (
        <ThemeProvider theme={theme}>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <div style={{ color: "white" }}>
              {blogs!.map((blog) => (
                <BlogCard
                  title={blog[0][2]}
                  body={blog[0][3]}
                  date={blog[0][5]}
                  key={blog[0]}
                />
              ))}
            </div>
          </Container>
        </ThemeProvider>
      ) : (
        <Skeleton animation="wave" />
      )}
    </>
  );
}