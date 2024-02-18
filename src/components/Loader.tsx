import loader from "../images/Spinner-0.6s-197px.gif";
export default function Loader() {
  return (
    <div className="loader">
      <img src={loader} />
      <p>Грузим...</p>
    </div>
  );
}
