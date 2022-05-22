import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import {GuideProps} from "@/router/types/router";
import guideRoute from "@/router/useGuard/guideRoute";
import NormalRoute from "@/router/useGuard/normalRoute";

function generateRouters(guide : GuideProps): JSX.Element{
    if (!guide.beforeEach){
        return (
            <Router>
                <NormalRoute routes={guide.routes} />
            </Router>
        )
    }
    return guideRoute(guide)
}

export default generateRouters
