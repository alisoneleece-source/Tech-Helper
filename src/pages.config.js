import Dashboard from './pages/Dashboard';
import Boards from './pages/Boards';
import Board from './pages/Board';
import Analytics from './pages/Analytics';
import Emergency from './pages/Emergency';
import Guide from './pages/Guide';
import Glossary from './pages/Glossary';
import HealthcareGuides from './pages/HealthcareGuides';
import AppleGuides from './pages/AppleGuides';
import Category from './pages/Category';
import Courses from './pages/Courses';
import Course from './pages/Course';
import SearchResults from './pages/SearchResults';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Dashboard": Dashboard,
    "Boards": Boards,
    "Board": Board,
    "Analytics": Analytics,
    "Emergency": Emergency,
    "Guide": Guide,
    "Glossary": Glossary,
    "HealthcareGuides": HealthcareGuides,
    "AppleGuides": AppleGuides,
    "Category": Category,
    "Courses": Courses,
    "Course": Course,
    "SearchResults": SearchResults,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};