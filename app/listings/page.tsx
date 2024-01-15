import getListings from "../actions/getListings";
import ListingCard from "../components/Cards/ListingCard";
import Container from "../components/Container";
import Listing from "../schemas/listing";

export default async function Listings() {
  const listings = await getListings();
  return (
    <div
      style={{
        backgroundImage: 'url("/ugh.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen"
    >
      <Container>
        <div
          className="
        
  pt-24
  grid
  grid-cols-4
  gap-8 "
        >
          {listings.map((listings: any) => {
            return <ListingCard data={listings}></ListingCard>;
          })}
        </div>
      </Container>
    </div>
  );
}
