import * as React from "react";
import {observer} from "mobx-react";
import {I18nState} from '../../../stores/i18n';
import {di} from 'jsmodules'
interface ILTextProps {
    bind : string;
    params
        ?;
    tagName?: string;
    className?: string;
    style?: any;
}

@observer
export class LText extends React.Component < ILTextProps, {} > {

    @di.Inject()i18n: I18nState;

    render() {
        let language = 'en-US';
        let {
            bind,
            params,
            tagName,
            className,
            style,
            children
        } = this.props;
        let text = this
            .i18n
            .L(bind, params, language);
        if (!tagName) {
            tagName = "span";
        }
        if (text) {
            return React.createElement(tagName, {
                className,
                dangerouslySetInnerHTML: {
                    __html: text
                },
                style,
                data: bind,
                lang: language
            });
        }
        return React.createElement(tagName, {
            className,
            style,
            data: bind,
            lang: language
        }, children);
    }

    static get(key, params
        ?, defaultText
        ?) {
        var i18n : I18nState = di.Resolve("i18n");
        return i18n.L(key, params, 'en-US') || defaultText;
    }
}