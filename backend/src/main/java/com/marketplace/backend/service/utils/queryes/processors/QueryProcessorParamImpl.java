package com.marketplace.backend.service.utils.queryes.processors;



import java.util.Map;

public record QueryProcessorParamImpl(String query, Map<String, Object> param) implements QueryProcessorParam {
}
