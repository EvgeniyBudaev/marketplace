package com.marketplace.properties;

import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.Property;
import com.marketplace.properties.model.convertes.PropertiesConverter;
import com.marketplace.properties.model.properties.PropertiesType;
import com.marketplace.properties.service.PropertiesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class AppProperties {
    private final PropertiesService propertiesService;
    private final PropertiesConverter propertiesConverter;
    private final Map<EPropertiesType, PropertiesType> properties;

    public AppProperties(PropertiesService propertiesService) {
        this.propertiesService = propertiesService;
        this.propertiesConverter = new PropertiesConverter();
        this.properties = new HashMap<>();
    }

    @PostConstruct
    public void init() {
        for (EPropertiesType type : EPropertiesType.values()) {
            Property property = propertiesService.getPropertyByType(type);
            this.properties.put(type, (PropertiesType) propertiesConverter.convertToEntityAttribute(property.getProperty(), type.getPropertyClass()));
        }
    }

    public PropertiesType getProperty(EPropertiesType type) {
        return this.properties.get(type);
    }


}
