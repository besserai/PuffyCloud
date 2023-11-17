import LevelSlider from './LevelSlider';
import SeasonSlider from './SeasonSlider';
import "./FilterControlsGrid.css"
import TypeOfFlyingSelect from './TypeOfFlyingSelect';
import MultiSelect from './MultiSelect';

export default function FilterControlsGrid({ filterState, setFilterStateWrapper }) {

    return (
        <div>

            <div className="controls-grid">
                <MultiSelect name={"landmasses"} possibleValues={filterState.landmasses.possibleValues} setFilterStateWrapper={setFilterStateWrapper} />
                <MultiSelect name={"countries"} possibleValues={filterState.countries.possibleValues} setFilterStateWrapper={setFilterStateWrapper} />
                <MultiSelect name={"flyingHubs"} possibleValues={filterState.flyingHubs.possibleValues} setFilterStateWrapper={setFilterStateWrapper} />
            </div>
            <div className="controls-grid">
                <LevelSlider setFilterStateWrapper={setFilterStateWrapper} />
                <SeasonSlider setFilterStateWrapper={setFilterStateWrapper} />
            </div>
            <div className="controls-grid">
                <TypeOfFlyingSelect setFilterStateWrapper={setFilterStateWrapper} />
            </div>
        </div>
    );

}
