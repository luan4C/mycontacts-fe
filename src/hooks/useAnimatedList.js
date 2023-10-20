import {
  createRef,
  useCallback, useEffect, useRef, useState,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const [items, setItems] = useState(initialValue);
  const animatedRefs = useRef(new Map());
  const animatedRefsEventListeners = useRef(new Map());
  const handleRemove = useCallback((itemId) => {
    setPendingRemovalItemsIds((prev) => [...prev, itemId]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    animatedRefsEventListeners.current.get(id)();
    animatedRefsEventListeners.current.delete(id);
    animatedRefs.current.delete(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animatedRefsEventListeners.current.has(itemId);
      const currRef = animatedRef?.current;

      if (currRef && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);

        const removeEventListener = () => {
          animatedRef.removeEventListener('animationend', onAnimationEnd);
        };

        animatedRef.current.addEventListener('animationend', onAnimationEnd);
        animatedRefsEventListeners.current.set(itemId, removeEventListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animatedRefsEventListeners.current;
    return () => {
      removeListeners.forEach((rmvListener) => rmvListener());
    };
  }, []);

  const getAnimatedRef = useCallback((id) => {
    let animatedElementRef = animatedRefs.current.get(id);

    if (!animatedElementRef) {
      animatedElementRef = createRef();
      animatedRefs.current.set(id, animatedElementRef);
    }
    return animatedElementRef;
  }, []);

  const renderList = useCallback(
    (renderItem) => items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedElementRef = getAnimatedRef(item.id);

      return renderItem(
        item,
        { isLeaving, animatedElementRef },
      );
    }),
    [items, pendingRemovalItemsIds, getAnimatedRef],
  );

  return {
    items, setItems, handleRemove, renderList,
  };
}
