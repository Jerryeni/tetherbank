'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
          };
          start_param?: string;
        };
        colorScheme: string;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
      };
    };
  }
}

export interface TelegramUser {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
  startParam?: string;
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize the WebApp
      tg.ready();
      tg.expand();

      // Get user data
      const webAppUser = tg.initDataUnsafe.user;
      if (webAppUser) {
        setUser({
          id: webAppUser.id.toString(),
          firstName: webAppUser.first_name,
          lastName: webAppUser.last_name,
          username: webAppUser.username,
          languageCode: webAppUser.language_code,
          isPremium: webAppUser.is_premium,
          photoUrl: webAppUser.photo_url,
          startParam: tg.initDataUnsafe.start_param,
        });
      }

      setIsReady(true);
    }
  }, []);

  return { user, isReady };
}

export function useTelegramTheme() {
  const [theme, setTheme] = useState({
    colorScheme: 'dark',
    params: {
      bgColor: '#0D102D',
      textColor: '#FFFFFF',
      hintColor: '#999999',
      linkColor: '#2481CC',
      buttonColor: '#2481CC',
      buttonTextColor: '#FFFFFF',
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setTheme({
        colorScheme: tg.colorScheme,
        params: {
          bgColor: tg.themeParams.bg_color,
          textColor: tg.themeParams.text_color,
          hintColor: tg.themeParams.hint_color,
          linkColor: tg.themeParams.link_color,
          buttonColor: tg.themeParams.button_color,
          buttonTextColor: tg.themeParams.button_text_color,
        },
      });
    }
  }, []);

  return theme;
}

export function useTelegramBackButton(shouldShow = true) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const backButton = window.Telegram.WebApp.BackButton;
      
      if (shouldShow) {
        backButton.show();
      } else {
        backButton.hide();
      }

      return () => {
        backButton.hide();
      };
    }
  }, [shouldShow]);
}

export function useTelegramMainButton(text: string, onClick: () => void) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const mainButton = window.Telegram.WebApp.MainButton;
      
      mainButton.text = text;
      mainButton.onClick(onClick);
      mainButton.show();

      return () => {
        mainButton.hide();
      };
    }
  }, [text, onClick]);
}