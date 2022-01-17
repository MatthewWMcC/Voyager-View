import { store } from 'global/store';
import m from 'mithril';
import { likePhoto, unlikePhoto } from 'services/firestore';
import uniqid from 'uniqid';
import { extendButtonAttrs } from 'utils/accessibility-helpers';

export const display: m.Component = {
    view: (vnode: m.VnodeDOM): m.Children => {
        const { imageData, postData } = store;
        if (!imageData) {
            return m('.loading', 'loading');
        }
        const { likes, liked, loading } = postData;
        const { date, explanation, url, title, media_type } = imageData;

        const isImage = media_type === 'image';
        const isVideo = media_type === 'video';

        return m(`card.image-display#${uniqid()}`, [
            m('header.title-elements', [
                m('h2.title', title),
                m('h2.date', date),
            ]),
            isImage &&
                m('img.pic-of-the-day', {
                    src: url,
                }),
            isVideo && m('video.pic-of-the-day', { src: url }),
            m('footer.bottom-row', [
                m('aside.like-section', [
                    m(`h4.like-display${liked ? '.liked' : ''}`, likes),
                    m(
                        'button.btn-styled',
                        extendButtonAttrs({
                            disabled: loading,
                            onclick: (e: Event) =>
                                model.handleLikePress(url, liked),
                        }),
                        liked ? 'Unlike' : 'Like'
                    ),
                ]),
                m('p.description', explanation),
            ]),
        ]);
    },
};

const model = {
    handleLikePress: (url: string, liked: boolean) => {
        if (liked) {
            unlikePhoto(url);
        } else {
            likePhoto(url);
        }
    },
};
