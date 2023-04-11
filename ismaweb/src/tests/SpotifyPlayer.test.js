import React from "react";
import { shallow } from "enzyme";
import SpotifyPlayer from "../SpotifyPlayer";

describe("SpotifyPlayer", () => { 
    it("should render correctly", () => { 
        const component = shallow(<SpotifyPlayer />);
        expect(component).toMatchSnapshot(); }); 
    } );