import { routesPath } from 'app/providers/router';
import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/libs';
import { AppLink, AppLinkTheme } from 'shared/ui';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { TextTheme, Text } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <Text
                className={cls.appName}
                title={t('Ulbi TV App')}
                theme={TextTheme.INVERTED}
            />
            <AppLink
                to={routesPath.article_create}
                theme={AppLinkTheme.SECONDARY}
                className={cls.createBtn}
            >
                {t('Создать статью')}
            </AppLink>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={authData ? onLogout : onShowModal}
            >
                {
                    t(`${authData ? 'Выйти' : 'Войти'}`)
                }
            </Button>
            {
                !authData && (
                    <LoginModal
                        isOpen={isAuthModal}
                        onClose={onCloseModal}
                    />
                )
            }

        </header>
    );
});
