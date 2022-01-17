import m from 'mithril';
import './styles/style.scss';
import { mainPage } from 'pages/mainPage/main-page';
import { setLocalId } from 'global/user';

const bodyContentContainer = document.getElementById('app-container');

if (bodyContentContainer === null) {
    throw new Error('The content-container was not found');
}

m.route.prefix = '#';

setLocalId();

m.route(bodyContentContainer, '/', {
    '/': mainPage,
});
