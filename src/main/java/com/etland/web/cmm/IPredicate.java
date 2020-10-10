package com.etland.web.cmm;

import org.springframework.stereotype.Service;

@FunctionalInterface
public interface IPredicate {
	public abstract boolean test(Object o);
}
