import { GetStaticProps } from "next";
import BookingForm from "../../components/BookingForm";
import fetchSBDatasource from "../api/storyblok-data-fetch";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchSBDatasource("pricing");
  const pricing: { [key: string]: number } = {};
  res.datasource_entries.forEach((entry: any) => {
    pricing[entry.name] = entry.value;
  });
  return {
    props: { pricing },
  };
};

export default function BookingPage({
  pricing,
}: {
  pricing: { [key: string]: number };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <BookingForm
        min={pricing.min}
        max={pricing.max}
        defaultPrice={pricing.default}
      />
    </div>
  );
}
