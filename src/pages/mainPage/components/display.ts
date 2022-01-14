import { store } from 'global/store';
import m from 'mithril';
import uniqid from 'uniqid';
import { extendButtonAttrs } from 'utils/accessibility-helpers';

export const display: m.Component = {
    view: (vnode: m.VnodeDOM): m.Children => {
        const { imageData } = store;
        if (!imageData) {
            return m('.loading', 'loading');
        }
        const { date, explanation, url, title, media_type } = imageData;
        return m(`card.image-display#${uniqid()}`, [
            m('header.title-elements', [
                m('h2.title', title),
                m('h2.date', date),
            ]),
            m('img.pic-of-the-day', {
                src: url,
            }),
            m('footer.bottom-row', [
                m('aside.like-section', [
                    m('h4.like-display', 0),
                    m(
                        'button.btn-styled',
                        extendButtonAttrs({}, (e: Event) =>
                            model.handleLikePress(e, url)
                        ),
                        'Like'
                    ),
                ]),
                m('p.description', explanation),
            ]),
        ]);
    },
};

const model = {
    handleLikePress: (e: Event, url: string) => {},
};
