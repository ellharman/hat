import { GetStaticProps } from "next";
import BookingForm from "../../components/BookingForm";
import fetchSBDatasource from "../api/storyblok-data-fetch";

export const getStaticProps: GetStaticProps = async () => {
  const pricing = await fetchSBDatasource("pricing");
  console.log(pricing);
  return {
    props: { pricing },
  };
};

export default function BookingPage({
  pricing,
}: {
  pricing: { min: number; max: number };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <BookingForm />
    </div>
  );
}
