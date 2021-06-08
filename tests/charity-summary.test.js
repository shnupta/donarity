import react from 'React';
//Using render and screen from test-utils.js instead of
//@testing-library/react
import { render, screen } from "../tests/test-utils";
import CharitySummary from '../components/charity-summary';

describe("CharitySummary", () => {
    test("should render the correct charity description", () => {
        const charity = {
                        id: "69",
                        name:"test-charity", 
                        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imperial.ac.uk%2F&psig=AOvVaw0wBBQ9owxju0qZkEU3QlGa&ust=1623233792418000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMio2Z_nh_ECFQAAAAAdAAAAABAD",
                        description: "hello world!"
                        }
        render(<CharitySummary charity={charity} />);

        expect(screen.getByText("hello world!")).toBeInTheDocument();
    });
});