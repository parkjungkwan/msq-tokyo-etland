package com.etland.web.cmm;

import org.springframework.stereotype.Service;

@FunctionalInterface
public interface ISupplier {
	public abstract Object get();
}
