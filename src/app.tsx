import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history } from '@redux/configure-store';
import { AppRouter } from './router/app-router';

export const App = () => {

    return (
        <>
            <Router history={history}>
                {/* <ErrorBoundary fallback={<NotFoundPage />}> */}
                    <AppRouter />
                {/* </ErrorBoundary> */}
            </Router>
        </>
    )
}
