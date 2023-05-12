package com.marketplace.users.service;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.users.model.AppRole;
import com.marketplace.users.model.enums.ERole;
import com.marketplace.users.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class AppRoleService {
    private final RoleRepository roleRepository;

    public AppRoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public AppRole getRoleByName(ERole roleName) {
        return roleRepository.getAppRoleByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Не найдена роль с именем " + roleName.name()));
    }
}
