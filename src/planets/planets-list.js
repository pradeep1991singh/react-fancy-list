// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPlanetList } from './planets-store';
import {
    DragDropList,
    APP_NAME,
    APP_SUB_HEADER,
    LOADING_TEXT,
    LOGO_LABEL
} from '../common'
import logo from '../assets/logo.svg';
import './planets.css'

import type { PlanetListProps, PlanetListStates } from './type-planets';

export class PlanetList extends Component<PlanetListProps, PlanetListStates> {

    constructor(props: PlanetListProps) {
        super(props);
        this.state = {
            totalPlanets: [],
            planets: [],
            searchText: '',
            offset: 5,
            total: 0,
            currentCount: 0,
            isLoading: false
        };
    }

    componentWillMount() {
        this.props.getPlanetList();
    }

    componentWillReceiveProps(nextProps: PlanetListProps) {
        if (nextProps.planets !== this.state.planets) {
            const initPlanets = nextProps.planets.slice(0, this.state.offset);
            this.setState({
                totalPlanets: nextProps.planets,
                planets: initPlanets,
                total: nextProps.planets.length
            });
        }
    }

    handleSearch = (e: any) => {
        this.setState({ searchText: e.target.value.toLowerCase() });
    }

    loadOnScroll = (e: any) => {
        // If list is reached then do nothing
        if (this.state.currentCount === this.state.total) return;

        const el: HTMLElement | null = document.getElementById('content-end');
        const rect = el && el.getBoundingClientRect();
        if (rect && document.documentElement
            && document.documentElement.clientHeight
            && document.documentElement.clientWidth
        ) {
            const loadNext = (
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (loadNext) {
                // User at the end of content. 
                // load next contents
                if (!this.state.isLoading) {
                    this.setState({ isLoading: true });

                    // Fetch next contents and update the list
                    // we can make apis call here
                    // or can fetch from redux-store too
                    var count = this.state.currentCount + this.state.offset
                    if (this.state.currentCount !== this.state.total) {
                        this.setState({
                            isLoading: false,
                            currentCount: count,
                            planets: this.state.totalPlanets.slice(0, count)
                        })
                    }
                }
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.loadOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadOnScroll);
    }

    render() {
        let { searchText, planets } = this.state;

        if (searchText) {
            // search planet within the planets
            planets = planets.filter(planet => {
                if (planet.name.toLowerCase().indexOf(searchText) > -1)
                    return planet;
            })
        }

        return (
            <div className="planets-list-container">
                <div className="list-item list-header">
                    <div className="header">
                        <h4>{APP_NAME}</h4>
                        <p className="sub-header">{APP_SUB_HEADER}</p>
                    </div>

                    <div className="logo-container">
                        <img src={logo} className="logo" alt="logo" />
                        <div className="logo-label">{LOGO_LABEL}</div>
                    </div>

                    <input type="text"
                        className="search-box"
                        placeholder="Search . . ."
                        autoComplete="off"
                        onChange={this.handleSearch} />
                </div>

                <div className="planets">
                    <div className="planets-list">
                        {planets &&
                            <DragDropList items={planets} />
                        }
                        {this.state.currentCount !== this.state.total &&
                            <div id="content-end" className="list-item loading">{LOADING_TEXT}</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ planetStore: { planets } }) => ({
    planets
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getPlanetList,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PlanetList);
